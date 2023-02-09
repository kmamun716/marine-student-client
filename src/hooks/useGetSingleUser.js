import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { host } from '../components/shared/host';

const useGetSingleUser = (token) => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(`${host}/api/v1/auth/loggedIn`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          localStorage.removeItem('authToken');
          navigate('/login')
          toast.error('Forbidden Access')
        } else {
          return res.json()
        }
      })
      .then((data) => {
        if (data?.email) {
          setIsLoading(false)
          return setStudent(data);
        }
      })
      .catch((err) => console.log(err));
  }, [token, navigate]);
  return [student, isLoading];
};

export default useGetSingleUser;
