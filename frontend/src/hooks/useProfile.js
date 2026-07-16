import { useEffect, useState } from "react";
import {
  getProfile,
  
} from "../services/profileService";

export default function useProfile() {

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadProfile();

  }, []);

  async function loadProfile() {

    try {

      const data = await getProfile();

      setProfile(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  }

  return {

    profile,

    loading,

    loadProfile,

  };

}