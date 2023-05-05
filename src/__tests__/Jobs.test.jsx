import { render, screen, fireEvent } from "@testing-library/react";
import Jobs from "../jobs/Jobs";



describe("Jobs", () => {
  
  test('renders Jobs component without crashing', () => {
    render(<Jobs />);
  });

  test('search input starts empty', () => {
    render(<Jobs />);
    const searchInput = screen.getByPlaceholderText('Search Filter');
    expect(searchInput.value).toBe('');
  });

  test("should render table headers", () => {
    render(<Jobs />);
    const ths = screen.getAllByRole("columnheader");
    expect(ths).toHaveLength(8);
    expect(ths[0]).toHaveTextContent("#");
    expect(ths[1]).toHaveTextContent("Driver's Email");
    expect(ths[2]).toHaveTextContent("Mechanic's Email");
    expect(ths[3]).toHaveTextContent("Date");
    expect(ths[4]).toHaveTextContent("Job Status");
    expect(ths[5]).toHaveTextContent("Fee");
    expect(ths[6]).toHaveTextContent("Rating");
    expect(ths[7]).toHaveTextContent("Feedback");
  });

  test("search input updates search state", () => {
    const { getByPlaceholderText } = render(<Jobs />);
    const input = getByPlaceholderText("Search Filter");
  
    fireEvent.change(input, { target: { value: "driver" } });
  
    expect(input.value).toBe("driver");
  });

  
  
});