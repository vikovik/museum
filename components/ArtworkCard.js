import SWR from 'swr'
import Error from 'next/error'
import Link from 'next/link'
import {Card, Button} from 'react-bootstrap'

function ArtworkCard({ objectID }) {
    const {data, error} = SWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
    return(
        error ? <Error statusCode={404} /> : !data ? null :
            <Card >
                <Card.Img variant="top" src={data.primaryImageSmall ? data.primaryImageSmall : 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'} />          
                <Card.Body>
                    <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
                    <Card.Text style={{paddingBottom: '1.5em'}}>
                        <b>Date: </b>{data.objectDate ? data.objectDate : 'N/A'}<br />
                        <b>Classification: </b>{data.classification ? data.classification : 'N/A'}<br />
                        <b>Medium: </b>{data.medium ? data.medium : 'N/A'}
                    </Card.Text>
                    <Link href={`/artwork/${objectID}`} passHref>
                        <Button variant="outline-dark">
                            <b>ID: </b>{objectID}
                        </Button>
                    </Link>                   
                </Card.Body>
            </Card>
    )
}

export default ArtworkCard