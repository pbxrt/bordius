import { Navbar } from '@nextui-org/react'
import AcmeLogo, { GoBack } from '@/components/AcmeLogo';

export default function NavBar() {
    return (
        <Navbar variant={'sticky'} isBordered={true}>
            <Navbar.Brand>
                <AcmeLogo />
            </Navbar.Brand>
            <Navbar.Content hideIn="xs">
                <Navbar.Link href="#">Features</Navbar.Link>
            </Navbar.Content>
            {/* <Navbar.Content>
                        <Navbar.Link color="inherit" href="#">Login</Navbar.Link>
                        <Navbar.Item>
                            <Button auto flat as={Link} href="#">Sign Up</Button>
                        </Navbar.Item>
                    </Navbar.Content> */}
        </Navbar>
    )
}

export function NavBarInEditPage() {
    return (
        <Navbar variant={'sticky'} isBordered={true}>
            <Navbar.Brand>
                <GoBack />
            </Navbar.Brand>
            <Navbar.Content hideIn="xs">
                <Navbar.Link href="#">Features</Navbar.Link>
            </Navbar.Content>
        </Navbar>
    );
}