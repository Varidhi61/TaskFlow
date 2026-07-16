import { useEffect, useState } from "react";

import { getProjects } from "../services/projectService";

export default function useProjects() {

  const [projects,setProjects]=useState([]);

  const [loading,setLoading]=useState(true);

  async function loadProjects(){

      const data=await getProjects();

      setProjects(data);

      setLoading(false);

  }

  useEffect(()=>{

      loadProjects();

  },[]);

  return{

      projects,

      loading,

      loadProjects

  };

}