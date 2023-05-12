import SWR from 'swr'
import Error from 'next/error'
import {Card, Button} from 'react-bootstrap'
import {useAtom} from 'jotai'
import {favouritesAtom} from '@/store'
import { addToFavourites, removeFromFavourites } from '@/lib/userData'
import {useState} from 'react'
import {useEffect} from 'react'

function ArtworkCardDetail({ objectID }) {
    const {data, error} = SWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null)
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    const [showAdded, setShowAdded] = useState(false)
    useEffect(()=>{
        setShowAdded(favouritesList?.includes(objectID))
    }, [favouritesList])    
    async function favouritesClicked(){
        if(showAdded){
            setFavouritesList(await removeFromFavourites(objectID))
        }
        else{
            setFavouritesList(await addToFavourites(objectID))
        }
    }
    return(
        error ? <Error statusCode={404} /> : !data ? null :
            <Card>
                {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}    
                <Card.Body>
                    <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
                    <Card.Text>
                        <b>Date: </b>{data.objectDate ? data.objectDate : 'N/A'}<br />
                        <b>Classification: </b>{data.classification ? data.classification : 'N/A'}<br />
                        <b>Medium: </b>{data.medium ? data.medium : 'N/A'}<br />
                        <br />
                        <b>Artist: </b>{data.artistDisplayName ? data.artistDisplayName : 'N/A'}
                        {data.artistDisplayName && <span> (<a href={data.artistWikidata_URL} style={{color: "#18bc9c"}} target="_blank" rel="noreferrer"> wiki </a>)</span>}<br />
                        <b>Credit Line: </b>{data.creditLine ? data.creditLine : 'N/A'}<br />
                        <b>Dimensions: </b>{data.dimensions ? data.dimensions : 'N/A'}<br /><br />
                        <Button variant={showAdded ? "primary" : "outline-primary"} onClick={(e) => favouritesClicked()}>{showAdded ? "+ Favourite (added)" : "+ Favourite"}</Button>
                    </Card.Text>                  
                </Card.Body>
            </Card>
    )
}

export default ArtworkCardDetail