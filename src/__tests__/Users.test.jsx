import { render, screen, fireEvent, waitFor, shallow } from "@testing-library/react";
import Users from "../users/Users";



describe("Users", () => {
  
    it('renders without crashing', () => {
        render(<Users />);
      });

      const drivers = [    {      id: 1,      fname: "John",      lname: "Doe",      email: "johndoe@example.com",      address: "123 Main St",      phone: "555-555-5555"    },    {      id: 2,      fname: "Jane",      lname: "Doe",      email: "janedoe@example.com",      address: "456 Elm St",      phone: "555-555-5555"    }  ];

      it("renders table with correct headers", () => {
        render(<Users drivers={drivers} />);
        expect(screen.getByText("#")).toBeInTheDocument();
        expect(screen.getByText("First Name")).toBeInTheDocument();
        expect(screen.getByText("Last Name")).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("Address")).toBeInTheDocument();
        expect(screen.getByText("Phone")).toBeInTheDocument();
      });

    
  
});