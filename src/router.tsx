import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateProject from "./views/projects/CreateProject";
import EditProject from "./views/projects/EditProject";
import ProjectDetails from "./views/projects/ProjectDetails";
import AuthLayout from "./layout/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestConfirmationCodeView from "./views/auth/RequestConfirmationCodeView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import ProjectTeamView from "./views/projects/ProjectTeamView";
import ProfileView from "./views/profile/ProfileView";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import ProfileLayout from "./layout/ProfileLayout";
import NotFound from "./views/404/NotFound";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" index element={<DashboardView />} />
                    <Route path="/projects/create" element={<CreateProject />} />
                    <Route path="/projects/:projectId" element={<ProjectDetails />} />
                    <Route path="/projects/:projectId/edit" element={<EditProject />} />
                    <Route path="/projects/:projectId/team" element={<ProjectTeamView />} />

                    <Route element={<ProfileLayout />}>
                        <Route path="/profile" element={<ProfileView />} />
                        <Route path="/profile/password" element={<ChangePasswordView />} />
                    </Route>
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} />
                    <Route path="/auth/register" element={<RegisterView />} />
                    <Route path="/auth/confirm-account"  element={<ConfirmAccountView />} />
                    <Route  path="/auth/request-code" element={<RequestConfirmationCodeView />} />
                    <Route  path="/auth/forgot-password"  element={<ForgotPasswordView />} />
                    <Route path="/auth/new-password" element={<NewPasswordView />} />
                </Route>
                <Route element={<AuthLayout/>}>
                    <Route path="*" element={<NotFound />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
