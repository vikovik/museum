import {Card, Form, Alert, Button} from 'react-bootstrap'
import {useState} from 'react'
import {useRouter} from 'next/router'
import {authenticateUser} from '@/lib/authenticate'
import {useAtom} from 'jotai'
import {favouritesAtom, searchHistoryAtom} from '@/store'
import {getFavourites, getHistory} from '@/lib/userData'

function Login() {
    const router = useRouter()
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    async function updateAtoms(){
        setFavouritesList(await getFavourites())
        setSearchHistory(await getHistory())
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            await authenticateUser(user, password)
            await updateAtoms()
            router.push('/favourites')
        }
        catch(err){
            setError(err.message)
        }
    }

    return(
        <>
            <Card bg="light">
                <Card.Body>
                    <Card.Title>Login</Card.Title>
                    <Card.Text>
                        <h2>Enter your login information below</h2>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>User: </Form.Label>
                    <Form.Control type="text" value={user} id="userName" name="userName" onChange={(e) => setUser(e.target.value)} />
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" value={password} id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                {error && (
                    <>
                        <br />
                        <Alert variant="danger">{error}</Alert>
                    </>
                )}
                <br />
                <Button variant="primary" className="pull-right" type="submit">Login</Button>
            </Form>
        </>
    )
}

export default Login