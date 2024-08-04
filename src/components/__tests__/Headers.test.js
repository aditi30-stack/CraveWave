import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { Headers } from "../Header"
import appStore from "../../utils/AppStore"
import "@testing-library/jest-dom"

describe("Testing Header Component", ()=>{
    test("Render Header Component with Navigation Links", ()=>{
        render(
            <BrowserRouter>
            <Provider store={appStore}>
                <Headers/>
            </Provider>
            </BrowserRouter>
        )

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
        expect(screen.getByText('Cart')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
        
    }),

    test("Render Header Logo", ()=>{
        render(
            <BrowserRouter>
            <Provider store={appStore}>
                <Headers/>
            </Provider>
            </BrowserRouter>
        )

        expect(screen.getByAltText('food logo')).toBeInTheDocument();
    }),

    test("should toggle the mini sidebar when login is clicked", ()=>{
        render(
            <BrowserRouter>
            <Provider store={appStore}>
                <Headers/>
            </Provider>
            </BrowserRouter>
        )

        const loginButton = screen.getByText("Login")
        fireEvent.click(loginButton)

        expect(screen.getByText("Logout")).toBeInTheDocument();



    })
})