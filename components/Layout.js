import { Container } from "react-bootstrap";
import MainNav from "@/components/MainNav";

function Layout({ children }) {
    return (
        <>
            <MainNav />
            <br />
            <br />
            <Container>
                {children}
            </Container>
            <br />
        </>
    )
}

export default Layout;