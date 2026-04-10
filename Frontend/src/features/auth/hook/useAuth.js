import {setUser, setLoading, setError} from "../state/auth.slice";
import { register } from "../service/auth.api";
import {useDispatch} from "react-redux";


export const useAuth =()=>{

    const dispatch = useDispatch();

async function handleregister({email,password,fullname,contact,isSeller= false}){
    const data = await register({email,password,fullname,contact,isSeller});

    dispatch(setUser(data.user));
}



    return {handleregister}
}