import { Navbar } from '@nextui-org/react'
import AcmeLogo, { GoBack } from '@/components/AcmeLogo';
import { useRouter } from 'next/router';

export default function NavBar() {
    const router = useRouter();
    const onClick = () => {
        window.open('/about', '_blank');
    }
    return (
        <Navbar variant={'sticky'} isBordered={true}>
            <Navbar.Brand>
                <AcmeLogo />
            </Navbar.Brand>
            <Navbar.Content hideIn="xs">
                <Navbar.Link onClick={onClick}>关于</Navbar.Link>
            </Navbar.Content>
        </Navbar>
    )
}
