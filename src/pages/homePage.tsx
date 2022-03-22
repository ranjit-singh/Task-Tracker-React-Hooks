import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import TaskTable from '../components/taskTable/taskTable';
import './homePage.scss';

const Home = () => {
  return (
    <React.Fragment>
      <div className="d-flex flex-column main-content">
        <Header />
        <main className='py-5 container flex-grow-1'>
          <TaskTable />
        </main>
        <Footer />
      </div>
      
    </React.Fragment>
  );
};

export default Home;
