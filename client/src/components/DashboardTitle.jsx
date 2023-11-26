import PropTypes from 'prop-types';

const DashboardTitle = ({ id, title, description, subTitle, children }) => {
  return (
    <section id={id}>
      <h1 style={{fontSize: '2rem', paddingBottom: '1rem' }}>{title}</h1>
      <p style={{ color: 'var(--light-gray-3)', fontSize: '1.2rem', paddingBottom: '1.3rem' }}>{description}</p>
      <h2 style={{ fontSize: '1.7rem ', paddingBottom: '1rem', borderBottom: '1px solid var(--light-gray-2)' }}>{subTitle}</h2>
      {children}
    </section>
  );
}

DashboardTitle.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
}

export default DashboardTitle;