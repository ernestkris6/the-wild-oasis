import supabase, { supabaseUrl } from "./supabase";

export async function signUp({fullName, email, password}) {
    const {data, error} = await supabase.auth.signUp({
        email, password, options: {
            data: {
                fullName,
                avatar: '',
            }
        }
    })

    if(error) throw new Error(error.message)

        return data;
}



export async function login({email, password}) {
    
const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
})

if(error) throw new Error(error.message)
    console.log(data);
    
    return data;

}


//user may want to access the page later so to stay signed in days later
//This refetches the already signed in user from supabase days later when attempting to login again
export async function getCurrentUser() {

    //getting if there is an active session from the local storage

    const {data: session} = await supabase.auth.getSession();

    if(!session.session) return null;

    const {data, error} = await supabase.auth.getUser();

    console.log(data);

    if(error) throw new Error(error.message)

    return data?.user;
    
}


//   email: 'someone@email.com',
//   password: 'pkKtLDXMdNeVctuJfiXh'


export async function logout() {
    const { error } = await supabase.auth.signOut();

    if(error) throw new Error(error.message)

}


export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatar")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatar/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}


//https://cewpohjcjinpewggeqxh.supabase.co/storage/v1/object/public/avatar/avatar-d9d78c3c-7f43-47a5-9343-46be4215871d-0.8647332940415614


// export async function updateCurrentUser({password, fullName, avatar}) {

//     //1. Update password or fullName

//     let updateData;
//     if (password) updateData = { password }
//     if (fullName) updateData = {data: {fullName}} //it has this shape because initially fullname was passed into data

//     const {data, error} = supabase.auth.updateUser(updateData)
    
//     if (error) throw new Error(error.message)
//     if (!avatar) return data;

//     // 2. Uplpoad the avatar image
//     const fileName = `avatar-${data.user.id}-${Math.random()}`;

//     const { error: storageError } = await supabase.storage.from("avatars").upload(fileName, avatar);

//     if (storageError) throw new Error(storageError.message);


//     // 3. Update avatar in the user

//     const {data: updatedUser, error: error2} = await supabase.auth.updateUser({data: {
//         avatar: `${supabaseUrl}/storage/v1/object/public/avatar/${fileName}`
//     }})

//     if (error2) throw new Error(error2.message)
//         return updatedUser;
// }

// https://cewpohjcjinpewggeqxh.supabase.co/storage/v1/object/public/avatar/cabin-002.jpg