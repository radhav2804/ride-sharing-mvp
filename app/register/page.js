'use client'

import {useState} from 'react'
import {supabase } from '@/lib/supabaseClient'
import {useRouter} from 'next/navigation'

export default function RegisterPage(){
    const router = useRouter()

    const [form, setForm] = useState({
        name : '',
        phone: '',
        email:'',
        password:''
    })


     const [loading, setLoading] = useState(false)

     function handleChange(e){
        setForm({
            ...form, [e.target.name]: e.target.value
        })
     }

     async function handleRegister(e){
        e.preventDefault()
        setLoading(true)

        const {name , phone, email, password} = form

        //create a Auth user
        const {data, error} = await supabase.auth.signUp({
            email,
            password
        })

        if(error){
            alert(error.message)
            setLoading(false)
            return 
        }
        
        const user = data.user

        const {error:dbError} = await supabase.from('users').insert({
            id : user.id,
            email : user.email,
            full_name : name,
            phone : phone
        })

        if(dbError){
            alert(dbError.message)
            setLoading(false)
            return
        }

        alert('Registration successful...!')
        router.push('/login')
     }


     return (
        <div style = {{padding:40}}>
            <h1>Create Accound</h1>

            <form onSubmit = {handleRegister} style={{maxWidth:400}}>
                <input
                  name="name"
                  placeholder='Full Name'
                  onChange={handleChange}
                  required
                  />

                  <br /><br />

                <input 
                 name='phone'
                 placeholder='Phone Number'
                onChange={handleChange}
                required
                />

                <br/><br/>

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                 <br/><br/>

                <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
                />

                <br /><br />

                <button disabled={loading}>
                    {loading ? 'Creating...':'Register'}
                </button>
            </form>
        </div>
     )

}