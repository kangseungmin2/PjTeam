from bs4 import BeautifulSoup
import urllib.request as req
import pandas as pd
import time

import time
# while True:

url = "https://finance.naver.com/marketindex/?tabSel=exchange#tab_section"

res = req.urlopen(url)
soup = BeautifulSoup(res, "html.parser",from_encoding="euc-kr")

name_nation = soup.select("h3.h_lst > span.blind")
name_price = soup.select('span.value')
name_nation2 = soup.select("div#sView > select.selectbox-source > option")

df = pd.DataFrame(columns=['nation','price'])

for i in name_nation2:
    value = float(i.get("value",0))
    label = int(i.get("label"))
    result = round(value,2)
    df2 = {'nation':i.string,'price':result}
    df = df._append(df2, ignore_index=True)

index = 0
df = df.drop(index)

print(df2)

    # time.sleep(10)  # 1시간(초 단위)마다 실행



import cx_Oracle
import sqlalchemy
# Oracle 데이터베이스 연결 정보
db_user = 'pjteam'
db_password = 'team1234'
db_host ='pjteam.cr9q4puz10f6.ap-northeast-2.rds.amazonaws.com'
db_port = '1521'
db_name ='orcl'
db_dsn = 'pjteam.cr9q4puz10f6.ap-northeast-2.rds.amazonaws.com:1521/orcl'  # 또는 SID

# db_dsn = cx_Oracle.makedsn('호스트', '포트', service_name='서비스이름')  # 또는 SID

# Oracle 데이터베이스에 연결
connection = cx_Oracle.connect(user=db_user, password=db_password, dsn=db_dsn)



# # SQL 쿼리를 사용하여 데이터베이스에 데이터 삽입
cursor = connection.cursor()
for index, row in df.iterrows():
    nation = row['nation']
    price = row['price']
    insert_query = ("INSERT INTO team_exchange (exchangeNum, nation, price) "
                    "VALUES ((SELECT NVL(MAX(exchangeNum)+1,1) FROM team_exchange), :nation, :price)")
    cursor.execute(insert_query, nation=nation, price=price)
connection.commit()

# 연결 종료
connection.close()
