"use client"
import { useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      if (searchTerm) {
        const response = await axios.get(`${process.env.API_URL}/api/CountrySearch/?search_term=${searchTerm}`, {
          withCredentials: true,
        });

        if (response.data.length > 0) {
          setCountries(response.data);
          setError(null);
        } else {
          setCountries([]);
          setError('No matching countries found for the provided search term.');
        }
      } else {
        setCountries([]);
        //setError('Please provide a search term.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Check specific conditions for different errors
      if (error.response && error.response.status === 404) {
        // Handle 404 error (No matching countries found)
        setCountries([]);
        setError('No matching countries found for the provided search term.');
      } else {
        // Handle other errors
        setCountries([]);
        setError('An error occurred while fetching data.');
      }
    }
  };

  return (
    <div className='container max-auto'>
      <div className='row'>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          keyup Functionality
        </h4>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input type="text" id="search_term" placeholder="Enter Country Name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyUp={handleSearch} />
        </div>
      </div>
      <hr />
      <div className='row'>
        <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
          Country Name Result
        </h4>
        {/* Display the results or error message */}
        {error ? (
          <p>{error}</p>
        ) : (
          // Only display the table if there are countries
          countries.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.no</TableHead>
                  <TableHead>Country Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {countries.map((country, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}. </TableCell>
                    <TableCell>{country.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
        )}
      </div>
    </div>
  )
}
