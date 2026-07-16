import { useEffect, useState } from "react";

import { getRecentActivity } from "../services/activityService";

export default function useActivity() {

  const [activity, setActivity] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadActivity();

  }, []);

  async function loadActivity() {

    try {

      const data = await getRecentActivity();

      setActivity(data);

    } finally {

      setLoading(false);

    }

  }

  return {

    activity,

    loading,

  };

}