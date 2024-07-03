import { supabase } from "../../supabase"

export const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    // console.log('data from account', user)
    return user
}

export const getOwners = async() => {
    let { data: owners, error } = await supabase.from("owners").select("*");
    console.log('data from owners', owners, error)
    return owners
}