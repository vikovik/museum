/*********************************************************************************
*  WEB422 – Assignment 5
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Viktoriia Kovinskaia Student ID: 110461217 Date: March 19, 2023
*
*
********************************************************************************/ 


import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Row, Col, Pagination, Card } from 'react-bootstrap'
import SWR from 'swr'
import Error from 'next/error'
import ArtworkCard from '@/components/ArtworkCard'
import validObjectIDList from '../../public/data/validObjectIDList.json'
const PER_PAGE = 12

function Artwork(){
    const [page, setPage] = useState(1)
    const [artworkList, setArtworkList] = useState([])
    const router = useRouter()
    let finalQuery = router.asPath.split('?')[1]
    const {data, error} = SWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`)
    const previousPage = () => {
        page > 1 ? setPage(page - 1) : null
    }
    const nextPage = () => {
        page < artworkList.length ? setPage(page + 1) : null
    }
    useEffect(() => {
        if(data){
            let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x))
            const results = []
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE)
                results.push(chunk);
            }                         
            setArtworkList(results);             
        }
        setPage(1)
    }, [data])
    return(
        <>
            {
                error ? <Error statusCode={404} /> : !artworkList ?  null :
                    <>
                        <Row className="gy-4" >
                            {
                                artworkList.length > 0 ? artworkList[page - 1].map((currentObjectID) => (
                                    <Col lg={3} key={currentObjectID}>
                                        <ArtworkCard objectID={currentObjectID} />
                                    </Col>
                                )) : 
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            <h4>Nothing Here</h4>
                                        </Card.Title>
                                        <Card.Text>
                                            <p>Try searching for something else.</p>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            }
                        </Row>
                        {
                            artworkList.length > 0 && 
                            <Row>
                                <Col>
                                    <Pagination>
                                        <Pagination.Prev onClick={previousPage} />
                                        <Pagination.Item>{page}</Pagination.Item>
                                        <Pagination.Next onClick={nextPage} />
                                    </Pagination>
                                </Col>
                            </Row>
                        }
                    </>
            }
        </>
    )
}

export default Artwork