import { Card } from 'primereact/card';

const Home = () => {
    const homeImg = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );

    return(
        <div className="flex justify-content-center">
            <Card title="Welcome Home !" subTitle="Test subtitle" header={homeImg} className="w-30rem">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
            </Card>
        </div>
    )
}

export default Home;