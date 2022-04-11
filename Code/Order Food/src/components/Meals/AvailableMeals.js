import { useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from "./MealItem/MealItem";


const AvailableMeals = () => {
    const { isLoading, error, httpRequest } = useHttp('http://localhost:5000');
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        httpRequest({
            resource: 'testing',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }, 
        (data) => {
            setMeals(data);
        });
    }, []);

    let content = <p>Not items found!</p>;

    if (meals.length > 0) {
        const mealsList = meals.map(meal => <MealItem key={meal.id} item={meal} />);
        content = <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>;
    }

    if (error) {
        content = <p>error</p>
    }

    if (isLoading) {
        content = <p>Loading...</p>
    }

    return <section className={classes.meals}>
        {content}
    </section>
};

export default AvailableMeals;