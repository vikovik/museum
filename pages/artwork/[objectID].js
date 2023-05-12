import { useRouter } from "next/router";
import Error from "next/error";
import {Row, Col} from "react-bootstrap";
import ArtworkCardDetail from "@/components/ArtworkCardDetail";

function ArtworkById(){
    const router = useRouter();
    const {objectID} = router.query;
    return(
        !objectID ? <Error statusCode={404} /> :
        <Row>
            <Col>
                <ArtworkCardDetail objectID={objectID} />
            </Col>
        </Row> 
    )
}

export default ArtworkById;