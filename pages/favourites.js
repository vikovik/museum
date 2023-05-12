import {useAtom} from 'jotai'
import {favouritesAtom} from '@/store'
import { Row, Col, Card } from 'react-bootstrap'
import ArtworkCard from '@/components/ArtworkCard'

function Favourites(){
    const [favourites, setFavourites] = useAtom(favouritesAtom)
    if(!favourites) return null;
    if (favourites){
        return(
            <Row className="gy-4" >
                {
                    favourites.length > 0 ? favourites.map((favourites) => (
                        <Col lg={3} key={favourites}>
                            <ArtworkCard objectID={favourites} />
                        </Col>
                    )) :
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h4><strong>Nothing Here</strong></h4>
                            </Card.Title>
                            <Card.Text>
                                <p>Try adding some new artwork to the list.</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                }
            </Row>
        )
    }
}

export default Favourites