import pandas as pd
import os
from sqlalchemy import create_engine

# Diretório base é o diretório atual onde o script está sendo executado
base_dir = os.getcwd()

# Construindo o caminho relativo
csv_file_path = os.path.join(base_dir, 'data', 'dados.csv')

# Convertendo para caminho absoluto (opcional, para debug ou validação)
absolute_path = os.path.abspath(csv_file_path)

# Obtendo as informações do banco de dados das variáveis de ambiente
db_user = os.getenv('PG_USER', 'default_user')
db_password = os.getenv('PG_PASSWORD', 'default_password')
db_host = os.getenv('PG_HOST', 'localhost')
db_port = os.getenv('PG_PORT', '5432')
db_name = os.getenv('POSTGRES_DB', 'default_db')
table_name = os.getenv('DB_TABLE', 'drogadata')

# Conexão com o banco de dados usando SQLAlchemy
path = f'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'
engine = create_engine(path)

# Lendo o CSV em um DataFrame
df = pd.read_csv(absolute_path)

# Salvando o DataFrame no banco de dados
try:
    df.to_sql(table_name, engine, if_exists='replace', index=False)
    print(f"Tabela '{table_name}' foi salva com sucesso no banco de dados!")
except Exception as e:
    print(f"Erro ao salvar dados no banco: {e}")
