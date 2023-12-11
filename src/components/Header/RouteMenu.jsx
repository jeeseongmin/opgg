import React from 'react';

const RouteMenu = ({ dataKey, menuName }) => {
  return (
    <li className={'route-menu'}>
      <a>
        <div data-key={'HOME'} className={`route-btn ${dataKey === 'HOME' ? 'selected' : ''}`}>{menuName}</div>
      </a>
    </li>
  );
};

export default RouteMenu;
