import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {

    //adding a logged in user to the react query cache
    // const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({email, password}) => loginApi({email, password}),
        onSuccess: (user) => {
            console.log(user);
            //adding a logged in user to the react query cache to avoid fetching again// didnt work tho
            // queryClient.setQueryData(['user'], user)
            navigate('/dashboard')
        },
        onError: (err) => {
            console.log('ERROR', err);
            toast.error('Provided email or password are incorrect')
        }
    })


    return {login, isLoading}
    
} 

// mutationFn: createEditCabin,
//     onSuccess: ()