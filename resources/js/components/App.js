import '/Users/sohamkatyal/code/wp-plugin-reader/resources/css/app.css';
import Button from 'antd/es/button';
import { Row, Col, Divider } from 'antd';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb } from 'antd';
import ReactDOM from "react-dom";
import Example from "./Example";
import React, { useEffect, useState } from 'react'
const { Header, Content, Footer } = Layout;
const { Meta } = Card;

const App = () => {
    const [data, setData] = useState(null)
    const getData = () =>
        fetch(`/plugindata`)
            .then((res) => res.json())

    useEffect(() => {
        getData().then((data) => setData(data))
    }, [])

    return (
        <div className="App">
            <div>
                <Layout className="layout">
                    <Header>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <a hre><img src="https://www.nativerank.com/storage/logo.svg"></img></a>
                        </Menu>
                    </Header>
                </Layout>

                <Row>
                    {data?.map((data) =>
                        <div className="Card-Style" style={{ margin: "20px" }}>
                            <Col xs={28} xl={10}>
                                <Card className="Card-Bg-Primary" hoverable size="small" title={data.name} extra={<a href={data.download_url}>  <Button type="primary">Download</Button></a>} style={{ width: 300 }}>
                                    <h4>Version: {data.version}</h4>
                                    <h4>Author: {data.author}</h4>
                                </Card>
                            </Col>
                        </div>
                    )}
                </Row>
            </div>
        </div>
    );
}

export default App;
if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
