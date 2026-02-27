'use Client';

import {useState} from 'react';
import {supabase} from '@/lib/supabaseClient';
import {useRouter} from 'next/navigation';

export default function LoginPage(){

    async function signIn(e){
        e.preventDefault();
        const {error} = await supabase.auth.signInWithPassword({
            email, 
            password
        })

        if(error){
            alert(error.message);
        }else{
            router.push(
                '/dashboard'
            )
        }
    }

    return (
         <div style={{padding:40}}>
            <h1>Login</h1>

            <form
         </div>
    )
}