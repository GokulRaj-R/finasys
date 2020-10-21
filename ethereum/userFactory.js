import web3 from './web3';
import userFactorySOL from './build/User.solUserFactory.json';

const userFactory = () => {
    return new web3.eth.Contract(
        JSON.parse(userFactorySOL.interface), '0x5E8C3102Ff3f2a3A938741591Fd732d4B19034ff'
    )
}

export default userFactory;