from fastapi import FastAPI
from vanna.openai import OpenAI_Chat
from vanna.chromadb import ChromaDB_VectorStore
import os

# Define your custom class combining ChromaDB and OpenAI
class MyVanna(ChromaDB_VectorStore, OpenAI_Chat):
    def __init__(self, config=None):
        ChromaDB_VectorStore.__init__(self, config=config)
        OpenAI_Chat.__init__(self, config=config)

# Initialize FastAPI app
app = FastAPI()

# Retrieve the API key from .env
api_key = os.getenv('OPENAI_API_KEY')

# Initialize Vanna with your OpenAI API key and model
vn = MyVanna(config={'api_key': api_key, 'model': 'GPT-4o'})

# Configure the SQL Server connection (from .env)
odbc_conn_str = (
    f"DRIVER={{ODBC Driver 17 for SQL Server}};"
    f"SERVER={os.getenv('SQL_SERVER')};"
    f"DATABASE={os.getenv('SQL_DATABASE')};"
    f"UID={os.getenv('SQL_USER')};"
    f"PWD={os.getenv('SQL_PASSWORD')};"
    f"Encrypt=yes;"
    f"TrustServerCertificate=yes;"
)

vn.connect_to_mssql(odbc_conn_str=odbc_conn_str)

@app.get("/")
def read_root():
    return {"message": "Python microservice is running with Vanna"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/info-schema")
def get_info_schema():
    # Retrieve the information schema columns from your database
    df_information_schema = vn.run_sql("SELECT * FROM INFORMATION_SCHEMA.COLUMNS")
    
    # Generate a training plan based on the schema
    plan = vn.get_training_plan_generic(df_information_schema)
    
    return {"training_plan": plan}

@app.post("/train")
def train_model():
    # Train the model based on the generated plan
    df_information_schema = vn.run_sql("SELECT * FROM INFORMATION_SCHEMA.COLUMNS")
    plan = vn.get_training_plan_generic(df_information_schema)
    
    # Uncomment the following line to actually train the model
    # vn.train(plan=plan)
    
    return {"status": "Training started based on the plan"}
