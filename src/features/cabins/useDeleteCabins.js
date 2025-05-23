import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeletecabin(){

    const queryClient = useQueryClient();
    
    const {isLoading: isDeleting, mutate: deleteCabin} = useMutation({
        // mutationFn: (id) => deleteCabin(id),
        mutationFn: deleteCabinApi,
        onSuccess: () => {
          toast.success('Cabin deleted successfully')
    
          queryClient.invalidateQueries({
            queryKey: ['cabins']
          })
        },
        onError: (err) => alert(err.message)
      })

      return {isDeleting, deleteCabin}
}


