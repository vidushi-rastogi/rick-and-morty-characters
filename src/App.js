import { useEffect, useState } from "react";
import SearchField from "./SearchField";
import './App.css'
import { Avatar, Card, Col, Pagination, Row, Typography } from "antd";

const { Title } = Typography;

function App() {
  const [apiResult, setApiResult] = useState([]);
  const [charactersInfo, setCharactersInfo] = useState([]);
  const [apiInfo, setAPIInfo] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchAPIResponse = async () => {
      await fetch(`https://rickandmortyapi.com/api/character?page=${pageNumber}`)
      .then(async (res) => {
        const result = await res.json();
        setAPIInfo(result.info);
        setApiResult(result.results);
        setCharactersInfo(result.results);
      })
    }

    fetchAPIResponse();
  }, [pageNumber]);

  const handlePageChange = (page, pageSize) => {
    setSearchValue('');
    console.log('charaters info',charactersInfo)
    setPageNumber(page)
  }

  return (
    <div className="App">
      <div style={{
        textAlign: "center"
      }}>
        <Title level={2} style={{color: "rgb(57, 118, 0)"}}>Rick and Morty Characters</Title>
      </div>
      <SearchField
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        apiResult={apiResult}
        charactersInfo={charactersInfo}
        setCharactersInfo={setCharactersInfo}
      />
      <Card className="list-container">
        {charactersInfo.map((item) => (
          <Row key={item.id} className="pt-10 pb-10 list-item">
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Avatar
                shape="square"
                size={150}
                src={item.image}
              />
            </Col>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <Title level={4} className="m-0">{item.name}</Title>
              <Row>
                <Col span={12}>
                  <p>Status: {item.status}</p>
                  <p>Species: {item.species}</p>
                  <p>Type: {item.type || 'N/A'}</p>
                </Col>
                <Col span={12}>
                  <p>Gender: {item.gender}</p>
                  <p>Orgin: {item?.origin?.name}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
      </Card>
      <div className="pagination-container">
        <Pagination 
          current={pageNumber}
          total={apiResult.length * apiInfo.pages}
          showSizeChanger={false}
          pageSize={apiResult.length}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default App;
