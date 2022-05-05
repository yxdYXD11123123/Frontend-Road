import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function JikeBreadcurmb(props) {
  const itemRender = (route, params, routes) => {
    const last = routes.indexOf(route) === routes.length - 1;

    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={"/" + route.path}>{route.breadcrumbName}</Link>
    );
  };

  return <Breadcrumb itemRender={itemRender} routes={props.items}></Breadcrumb>;
}

JikeBreadcurmb.propTypes = {
  items: PropTypes.array,
};

export default JikeBreadcurmb;
