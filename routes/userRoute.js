import { createUser, getAllUsers, getUser, updateUser, deleteUser } from "../controllers/userController";
import { createUserAddress, getAllUserAddresses, getUserAddress, updateUserAddress, deleteUserAddress } from "../controllers/userAddressController";
import router from "./customerRoutes";

const router = express.router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


//useerAddress routes
router.post('/', createUserAddress);
router.get('/', getAllUserAddresses);
router.get('/:id', getUserAddress)
router.put('/:id', updateUserAddress)
router.delete('/:id', deleteUserAddress)







