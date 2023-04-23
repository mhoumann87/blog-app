import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import About from './components/About';
import Missing from './components/Missing';

import { format } from 'date-fns';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'My first post',
      datetime: 'July 01, 2021, 11:37:21 AM',
      body: `I'm baby hammock plaid enamel pin raw denim sartorial put a bird on it activated charcoal glossier vape letterpress marxism cold-pressed cray. Keffiyeh cloud bread gochujang polaroid selfies neutral milk hotel swag cronut. Echo park fashion axe kinfolk jean shorts enamel pin celiac gastropub. Drinking vinegar meggings poutine, iceland chillwave sustainable bushwick ascot gatekeep pug truffaut four dollar toast gastropub distillery williamsburg. Hoodie tousled freegan artisan la croix. Everyday carry hell of art party four dollar toast you probably haven't heard of them, master cleanse twee occupy flexitarian. Sriracha authentic letterpress pok pok paleo banh mi.`,
    },
    {
      id: 2,
      title: 'My 2nd post',
      datetime: 'July 02, 2021, 8:23:48 AM',
      body: "Draft policy ppml proposal i also believe it's important for every member to be involved and invested in our company and this is one way to do so let's unpack that later, we should leverage existing asserts that ladder up to the message. Sorry i didn't get your email can I just chime in on that one, so highlights , for i have a hard stop in an hour and half. Crisp ppt this vendor is incompetent . Drink the Kool-aid nail it down we need to aspirationalise our offerings can we align on lunch orders sacred cow, for gage (sic) where the industry is heading and give back to the community what weâ€™ve learned, but knowledge is power. Increase the resolution, scale it up we need a larger print window of opportunity can you slack it to me?. UI lift and shift, and gain alignment run it up the flagpole, ping the boss and circle back highlights , yet punter. Viral engagement. Moving the goalposts not a hill to die on. Fast track commitment to the cause , yet conversational content that jerk from finance really threw me under the bus, for face time, yet let's schedule a standup during the sprint to review our kpis let's prioritize the low-hanging fruit. We just need to put these last issues to bed optimize the fireball, yet ultimate measure of success, for strategic fit, or closing these latest prospects is like putting socks on an octopus. Deploy translating our vision of having a market leading platfrom, but on-brand but completeley fresh our competitors are jumping the shark in an ideal world, or UI we need a paradigm shift. Face time loop back that jerk from finance really threw me under the bus we want to empower the team with the right tools and guidance to uplevel our craft and build better. Build on a culture of contribution and inclusion move the needle 360 degree content marketing pool, or bleeding edge, and fast track , or cross sabers best practices. Net net we need to follow protocol, but run it up the flagpole, ping the boss and circle back, so everyone thinks the soup tastes better after theyâ€™ve pissed in it, for productize show pony incentivization. My capacity is full bottleneck mice.",
    },
    {
      id: 3,
      title: 'The absolute third post',
      datetime: 'July 04, 2021, 5:10:15 PM',
      body: "Give us a complimentary logo along with the website. I know somebody who can do this for a reasonable cost we are your relatives, but it looks a bit empty, try to make everything bigger, but can you make the font bigger? pass the mayo, appeal to the client, sue the vice president , yet remember, everything is the same or better, so this looks perfect. Just Photoshop out the dog, add a baby, and make the curtains blue. Can you make the blue bluer?. Can you make it pop can it be more retro can you remove my double chin on my business card photo? i don't like the way it looks this was not according to brief, the website doesn't have the theme i was going for. Can we barter services?. The website doesn't have the theme i was going for can we barter services? doing some work for us \"pro bono\" will really add to your portfolio i promise pass the mayo, appeal to the client, sue the vice president just do what you think. I trust you the website doesn't have the theme i was going for the target audience is makes and famles aged zero and up. I need a website. How much will it cost that's great, but can you make it work for ie 2 please, but the animation does not work, when i print the page, for can we make it shorter? the website doesn't have the theme i was going for. We have big contacts we will promote you. Theres all this spanish text on my site im not sure, try something else im not sure, try something else can you pimp this powerpoint, need more geometry patterns can you rework to make the pizza look more delicious. I want you to take it to the next level it's great, can you add a beard though . We need more images of groups of people having non-specific types of fun we need to make the new version clean and sexy, yet can you turn it around in photoshop so we can see more of the front you can get my logo from facebook, yet can you make it look more designed . Can you make pink a little more pinkish there is too much white space, for make it look like Apple. Can you turn it around in photoshop so we can see more of the front. That's great, but we need to add this 2000 line essay i think this should be fairly easy so if you just want to have a look I know somebody who can do this for a reasonable cost, or I got your invoice...it seems really high, why did you charge so much, for you can get my logo from facebook. ",
    },
    {
      id: 4,
      title: 'Could it be the 4th?',
      datetime: 'July 08, 2021, 3:19:37 PM',
      body: 'Chupa chups toffee tiramisu lemon drops apple pie croissant shortbread. Chocolate cake bonbon fruitcake apple pie powder chupa chups jelly beans. Brownie brownie gummies gummies tart sweet roll chocolate cake halvah. Cookie liquorice powder tart jelly beans macaroon powder.',
    },
  ]);

  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    // Set and id based on the previous posts
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    // Find datetime
    const datetime = format(new Date(), 'MMMM dd yyyy pp');
    // create the new post
    const newPost = { id, title: postTitle, datetime, body: postBody };
    // create a new array with all posts
    const allPosts = [...posts, newPost];
    // update the post array
    setPosts(allPosts);
    // Clear the fields in the form
    setPostTitle('');
    setPostBody('');
    // Go back to the frontpage
    navigate('/');
  };

  const handleDelete = id => {
    const postsList = posts.filter(post => post.id !== id);

    setPosts(postsList);
    navigate('/');
  };

  return (
    <>
      <Header title={'Blog APP'} search={search} setSearch={setSearch} />

      <Routes>
        <Route path='/' element={<Home posts={posts} />} />

        <Route
          path='/post'
          element={
            <NewPost
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              handleSubmit={handleSubmit}
            />
          }
        />

        <Route
          path='/post/:id'
          element={<PostPage posts={posts} handelDelete={handleDelete} />}
        />

        <Route path='/about' element={<About />} />

        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
