import { isAxiosError } from "axios";
import { CheckPassword, ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, User, UserLoginForm, UserRegistrationForm } from "../types";
import api from "../lib/axios";

export async function createAccountApi(formData: UserRegistrationForm){
    try {
        const url = '/auth/create-account'
        const {data} = await api.post<string>(url, formData);
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export async function confirmAccountApi(formData: ConfirmToken){
    try {
        const url = '/auth/confirm-account'
        const {data} = await api.post<string>(url, formData);
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export async function requestConfirmationCodeApi(formData: RequestConfirmationCodeForm){
    try {
        const url = '/auth/request-code'
        const {data} = await api.post<string>(url, formData);
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function authenticateUser(formData: UserLoginForm){
    try {
        const url = '/auth/login'
        const {data} = await api.post<string>(url, formData);
        localStorage.setItem('AUTH_TOKEN', data); 
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function forgotPasswordApi(formData: ForgotPasswordForm){
    try {
        const url = '/auth/forgot-password'
        const {data} = await api.post<string>(url, formData);
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}



export async function validateTokenApi(formData: ConfirmToken){
    try {
        const url = '/auth/validate-token'
        const {data} = await api.post<string>(url, formData);
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export async function updatePasswordWithTokenApi({formData, token}: {formData: NewPasswordForm, token: ConfirmToken['token']}){
    try {
        const url = `/auth/update-password/${token}`
        const {data} = await api.post<string>(url, formData);
        return data

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}




export async function getUser(){
    try {
        const {data} = await api<User>('/auth/user')
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function checkPassword(formData: CheckPassword){
    try {
        const {data} = await api.post<string>('/auth/check-password', formData)
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}