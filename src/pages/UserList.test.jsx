import { render, screen } from "@testing-library/react";
import UserList from "./UserList";
import axios from "axios";

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
})); // En mode test on réduit useNavigate au strict nécessaire pour éviter les erreurs

jest.mock("axios"); // On transforme axios en fonction inutilisable

test("affiche le titre", () => {
  render(<UserList />);
  // const linkElement = screen.getByText(/Liste des rôles/i);
  const linkElement = screen.getByText("Liste des jedis");
  expect(linkElement).toBeInTheDocument();
});

test("affiche un élément de la liste", async () => {
  const mockUsers = [{ name: "Leanne" }, { name: "Clémentine" }];
  const mockRes = { data: mockUsers };
  axios.get.mockResolvedValue(Promise.resolve(mockRes));
  render(<UserList />);
  await screen.findByText("Leanne");
  expect(screen.getByText("Leanne")).toBeInTheDocument();
  expect(screen.getByText("Clementine")).toBeInTheDocument();
});
