import oracledb
from bs4 import BeautifulSoup
import pandas as pd
import requests
import oracledb
import schedule
import time

def run_insert():
    # API 엔드포인트 및 파라미터 설정
    url = "http://apis.data.go.kr/1160100/service/GetSecuritiesProductInfoService/getETFPriceInfo"
    service_key = "j9Nm83kIqUr4rv4xI5506+aGGd79TvAHvi7iyCzG63XWN/iuXZJv5hsYYg1hUFtrurqXlk03M5u3YON4R3ZwNQ=="

    # GET 요청 보내기
    response = requests.get(url, params={
        "serviceKey": service_key,
        "pageNo": '1',
        "numOfRows": '50',
        "basDt": '20231030'

    })

    # 요청이 성공했을 경우
    if response.status_code == 200:

        # 응답 데이터를 BeautifulSoup을 사용하여 HTML 데이터로 파싱
        soup = BeautifulSoup(response.text)
        print(soup)
        # 데이터를 추출할 태그명 설정 (여기에서는 'item')
        data = soup.find_all('item')
        print(data)
        # 데이터 추출 및 딕셔너리로 저장
        data_list = []
        for item in data:
            # 딕셔너리로 생성
            data_dict = {}
            for element in item.find_all():
                data_dict[element.name] = element.text
            data_list.append(data_dict)

        # 데이터프레임으로 변환
        df = pd.DataFrame(data_list)

        # 데이터프레임 출력
        print(df)

        # 컬럼순서 확인
        columns = df.columns
        print(columns)

        # 기존열 : 변경열
        new_column = {
            'basdt': 'eventDate',
            'srtncd': 'fpNum',
            'isincd': 'isinCd',
            'itmsnm': 'fpName',
            'clpr': 'closingPrice',
            'vs': 'bFluctuationRate',
            'fltrt': 'fluctuationRate',
            'nav': 'netAssetValue',
            'mkp': 'marketPrice',
            'hipr': 'highPrice',
            'lopr': 'lowPrice',
            'trqu': 'tradingVolume',
            'trprc': 'transactionAmount',
            'mrkttotamt': 'marketCapitalization',
            'nppttotamt': 'totalNetAssets',
            'stlstgcnt': 'listingsNum',
            'bssidxidxnm': 'bIndexName',
            'bssidxclpr': 'bClosingPrice'
        }

        # 열 이름 변경
        df = df.rename(columns=new_column)
        print(df)

        # 컬럼순서 확인
        columns = df.columns
        print(columns)

        # 문자열로 들어온 eventDate를 date 타입으로 변경 (20231019 => 2023-10-19)
        df['eventDate'] = pd.to_datetime(df['eventDate'], format='%Y%m%d').dt.date

        # Oracle 데이터베이스 연결 정보 설정 및 커서 생성
        connection = oracledb.connect("pjteam/team1234@pjteam.cr9q4puz10f6.ap-northeast-2.rds.amazonaws.com:1521/orcl")
        cursor = connection.cursor()

        # iterrows() => 각 행에 열을 반복하는데 사용
        # cursor => 위에 미리 생성해둔 cursor를 사용하여 query문을 지정할 수 있으며 원하는 데이터를 삽입할 수 있다.

        for index, row in df.iterrows():
            query = (
                "INSERT INTO team_fund_product (eventDate, fpNum, isinCd, fpName, closingPrice, bFluctuationRate, fluctuationRate, netAssetValue, marketPrice, "
                "highPrice, lowPrice, tradingVolume, transactionAmount, marketCapitalization, totalNetAssets, listingsNum, bIndexName, bClosingPrice, etc, productNum) "
                "VALUES (:1, :2, :3, :4, :5, :6, :7, :8, :9, :10, :11, :12, :13, :14, :15, :16, :17, :18, TRUNC(DBMS_RANDOM.VALUE(1, 6)), NVL((SELECT MAX(productNum) FROM team_fund_product), 0) + 1)")
            cursor.execute(query, (row['eventDate'], row['fpNum'], row['isinCd'], row['fpName'], row['closingPrice'], row['bFluctuationRate'],
                                            row['fluctuationRate'], row['netAssetValue'],
                                            row['marketPrice'], row['highPrice'], row['lowPrice'], row['tradingVolume'], row['transactionAmount'],
                                            row['marketCapitalization'], row['totalNetAssets'], row['listingsNum'],
                                            row['bIndexName'], row['bClosingPrice']))

        print("insert 되었습니다.")
        connection.commit()
        cursor.close()
        connection.close()
    else:
        # 요청이 실패한 경우
        print("요청 실패. 상태 코드:", response.status_code)

# 스케줄링 설정: 매일 오후 5시에 실행
schedule.every().day.at("13:25").do(run_insert)

while True:
    schedule.run_pending()
    time.sleep(10)