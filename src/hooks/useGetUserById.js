import { useEffect, useState } from 'react';

const useGetStudentById = (id) => {
    const [student, setStudent] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isRefetch, refetch] = useState(false);
    useEffect(() => {
        fetch(`http://localhost:4000/api/v1/student/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.email) {
                    setIsLoading(false)
                    refetch(false)
                    return setStudent(data);
                }
            })
            .catch((err) => console.log(err));
    }, [id, isRefetch]);
    return [student, isLoading, refetch];
};

export default useGetStudentById;
