import React from "react";
import axios from "axios";
import {ErrorWrapper, Wrapper}  from './Search.Styles';

const rootUrl = "https://api.github.com";
const Search = ({updateURL}) => {
  const [user, setUser] = React.useState("fabpot");
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (user) {
      setUser('');
      const response = await axios(`${rootUrl}/users/${user}`).catch((err) => {
        setError(true)
      });
      updateURL(response?.data?.login);
    }
  };
  return (
    <section className="section">
      <Wrapper className="section-center">
        {error && (
          <ErrorWrapper>
            <p>some went wrong</p>
          </ErrorWrapper>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            {/* <MdSearch /> */}
            <input
              type="text"
              placeholder="enter github user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            {!isLoading && <button type="submit">search</button>}
          </div>
        </form>
      </Wrapper>
    </section>
  );
};


export default Search;
