import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";

export default function useDashboard() {

    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchDashboard();

    }, []);

    async function fetchDashboard() {

        try {

            const data = await getDashboardStats();

            setStats(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    }

    return {

        stats,

        loading,

        fetchDashboard

    };

}