import React, { useState, useEffect } from "react";

// Heart icon
const Heart = ({ liked }) => <span style={{ color: liked ? "red" : "#888" }}>❤️</span>;

// Time helper
const timeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

// Comment Input
const CommentInput = ({ postId, addComment }) => {
  const [text, setText] = useState("");
  return (
    <div style={{ display: "flex", gap: "5px", marginTop: "8px" }}>
      <input
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          flex: 1,
          borderRadius: "20px",
          padding: "8px 12px",
          fontSize: "14px",
          border: "1px solid #ddd",
        }}
      />
      <button
        onClick={() => {
          addComment(postId, text);
          setText("");
        }}
        style={{
          borderRadius: "20px",
          padding: "8px 15px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Post
      </button>
    </div>
  );
};

export default function App() {
  // PROFILE
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    bio: "Fantasy & romance author ✨",
    profileImage: "", // empty, no logo image
  });

  // FOLLOWERS & SUBSCRIPTIONS
  const [followers, setFollowers] = useState(500);
  const [subscription, setSubscription] = useState(2); // Silver
  const followersGain = { 1: 25, 2: 75, 3: 125 };

  const subscriptionPackages = [
    { id: 1, name: "Bronze", price: "$19/mo", color: "#cd7f32" },
    { id: 2, name: "Silver", price: "$39/mo", color: "#c0c0c0" },
    { id: 3, name: "Gold", price: "$69/mo", color: "#ffd700" },
  ];

  const publishingServices = [
    { id: 1, name: "Editing", price: "$49" },
    { id: 2, name: "Proofreading", price: "$29" },
    { id: 3, name: "Audiobook Recording", price: "$99" },
  ];

  const mockReviews = [
    { id: 1, user: "Reader1", text: "Absolutely loved this book!" },
    { id: 2, user: "Reader2", text: "A thrilling journey from start to finish." },
    { id: 3, user: "Reader3", text: "Couldn't put it down, amazing storytelling." },
  ];

  const mockTips = [
    "Outline chapters before writing.",
    "Proofread your book thoroughly.",
    "Engage with your readers on social media.",
    "Experiment with audiobook narration.",
    "Join author communities for support.",
  ];

  // POSTS
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Jane Doe",
      content: "Excited to share my new audiobook! 🎧 Check it out now!",
      likes: 35,
      timestamp: new Date(Date.now() - 60000 * 15),
      comments: [
        { id: 1, user: "Reader1", text: "Can't wait!", timestamp: new Date(Date.now() - 30000) },
        { id: 2, user: "Reader2", text: "Love your writing!", timestamp: new Date(Date.now() - 60000) },
      ],
    },
    {
      id: 2,
      user: "Jane Doe",
      content: "Tips for aspiring authors: Outline your chapters before writing!",
      likes: 22,
      timestamp: new Date(Date.now() - 60000 * 60),
      comments: [{ id: 3, user: "Reader3", text: "Great advice!", timestamp: new Date(Date.now() - 60000 * 30) }],
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfile({ ...profile, profileImage: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const addPost = () => {
    if (!newPost.trim()) return;
    setPosts([{ id: Date.now(), user: profile.name, content: newPost, likes: 0, timestamp: new Date(), comments: [] }, ...posts]);
    setNewPost("");
  };

  const likePost = (id) => setPosts(posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
  const editPost = (id) => {
    const post = posts.find((p) => p.id === id);
    const updated = prompt("Edit post:", post.content);
    if (updated !== null) setPosts(posts.map((p) => (p.id === id ? { ...p, content: updated } : p)));
  };
  const deletePost = (id) => setPosts(posts.filter((p) => p.id !== id));
  const addComment = (postId, text) => {
    if (!text.trim()) return;
    const comment = { id: Date.now(), user: profile.name, text, timestamp: new Date() };
    setPosts(posts.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, comment] } : p)));
  };

  const handleSubscribe = (pkg) => {
    if (subscription !== pkg.id) {
      const currentGain = subscription ? followersGain[subscription] : 0;
      const newGain = followersGain[pkg.id];
      setFollowers((prev) => prev + (newGain - currentGain));
      setSubscription(pkg.id);
    }
  };

  const [paymentMessage, setPaymentMessage] = useState("");

  const handleServicePurchase = (service) => {
    setPaymentMessage(`Payment Successful! Purchased ${service.name} for ${service.price}`);
    setTimeout(() => setPaymentMessage(""), 3000);
  };

  const [activeTab, setActiveTab] = useState("feed");
  const [tabContentVisible, setTabContentVisible] = useState(true);

  const handleTabChange = (tab) => {
    setTabContentVisible(false);
    setTimeout(() => {
      setActiveTab(tab);
      setTabContentVisible(true);
    }, 200);
  };

  // Gradient shuffle background
  const [bgGradient, setBgGradient] = useState("linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb)");
  useEffect(() => {
    const gradients = [
      "linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb)",
      "linear-gradient(135deg, #a18cd1, #fbc2eb, #fad0c4)",
      "linear-gradient(135deg, #f6d365, #fda085, #f6d365)",
      "linear-gradient(135deg, #84fab0, #8fd3f4, #84fab0)",
    ];
    const interval = setInterval(() => {
      const next = gradients[Math.floor(Math.random() * gradients.length)];
      setBgGradient(next);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
      background: bgGradient,
      padding: "10px",
      gap: "10px",
    }}>
      {/* LEFT SIDEBAR */}
      <div style={{ width: "250px", padding: "20px", background: "rgba(255,255,255,0.95)", borderRadius: "16px", boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>
        <h2>{profile.name}</h2>
        <p style={{ color: "#555" }}>{profile.bio}</p>
        <p style={{ color: "#28a745" }}>Followers: {followers}</p>

        <div style={{ marginTop: "20px" }}>
          {["feed", "reviews", "tips"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              style={{
                display: "block",
                width: "100%",
                marginBottom: "8px",
                padding: "8px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                background: activeTab === tab ? "#007bff" : "#ddd",
                color: activeTab === tab ? "#fff" : "#000",
                fontWeight: "bold",
              }}
            >
              {tab === "feed" ? "News Feed" : tab === "reviews" ? "Book Reviews" : "Author Tips"}
            </button>
          ))}
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div style={{
        flex: 1,
        padding: "10px",
        maxWidth: "600px",
        opacity: tabContentVisible ? 1 : 0,
        transition: "opacity 0.3s",
      }}>
        {activeTab === "feed" && tabContentVisible && (
          <>
            <div style={{ background: "#fff", padding: "15px", borderRadius: "12px", marginBottom: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind?"
                style={{ width: "100%", borderRadius: "12px", padding: "12px", resize: "none", marginBottom: "10px", border: "1px solid #ddd" }}
              />
              <button
                onClick={addPost}
                style={{ padding: "8px 16px", background: "#007bff", color: "#fff", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "bold" }}
              >
                Post
              </button>
            </div>

            {posts.map((post) => (
              <div key={post.id} style={{ background: "#fff", padding: "15px", borderRadius: "16px", marginBottom: "20px", boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <div>
                    <strong>{post.user}</strong>
                    <div style={{ fontSize: "12px", color: "#888" }}>{timeSince(post.timestamp)}</div>
                  </div>
                </div>
                <p style={{ marginBottom: "10px" }}>{post.content}</p>
                <div style={{ display: "flex", gap: "15px", marginBottom: "10px" }}>
                  <button onClick={() => likePost(post.id)} style={{ cursor: "pointer" }}>
                    <Heart /> {post.likes}
                  </button>
                  <button onClick={() => editPost(post.id)} style={{ cursor: "pointer" }}>✏️ Edit</button>
                  <button onClick={() => deletePost(post.id)} style={{ cursor: "pointer" }}>🗑️ Delete</button>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  {post.comments.map((c) => (
                    <div key={c.id} style={{ fontSize: "13px", marginBottom: "5px" }}>
                      <strong>{c.user}</strong>: {c.text} <span style={{ color: "#888", fontSize: "11px" }}>({timeSince(c.timestamp)})</span>
                    </div>
                  ))}
                  <CommentInput postId={post.id} addComment={addComment} />
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === "reviews" && tabContentVisible && (
          <div style={{ background: "#fff", padding: "20px", borderRadius: "16px", boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}>
            <h3>Book Reviews</h3>
            {mockReviews.map((r) => (
              <p key={r.id}><strong>{r.user}:</strong> {r.text}</p>
            ))}
          </div>
        )}

        {activeTab === "tips" && tabContentVisible && (
          <div style={{ background: "#fff", padding: "20px", borderRadius: "16px", boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}>
            <h3>Author Tips</h3>
            {mockTips.map((t, idx) => (
              <p key={idx}>• {t}</p>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT SIDEBAR */}
      <div style={{ width: "250px", padding: "20px" }}>
        <h3>Subscription Packages</h3>
        {subscriptionPackages.map((pkg) => (
          <div key={pkg.id} style={{ background: "#fff", padding: "12px", borderRadius: "14px", marginBottom: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", textAlign: "center" }}>
            <h4>{pkg.name}</h4>
            <p style={{ color: pkg.color, fontWeight: "bold", marginBottom: "10px" }}>{pkg.price}</p>
            <button
              onClick={() => handleSubscribe(pkg)}
              style={{ padding: "6px 14px", borderRadius: "12px", border: "none", background: subscription === pkg.id ? "#6c757d" : "#28a745", color: "#fff", cursor: "pointer", fontWeight: "bold" }}
            >
              {subscription === pkg.id ? "Subscribed" : "Subscribe"}
            </button>
          </div>
        ))}

        <h3 style={{ margin: "20px 0 10px 0" }}>Publishing Services</h3>
        {publishingServices.map((service) => (
          <div key={service.id} style={{ background: "#fff", padding: "12px", borderRadius: "14px", marginBottom: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", textAlign: "center" }}>
            <p style={{ fontWeight: "bold", marginBottom: "8px" }}>{service.name}</p>
            <p style={{ marginBottom: "8px" }}>{service.price}</p>
            <button
              onClick={() => handleServicePurchase(service)}
              style={{ padding: "6px 14px", borderRadius: "12px", border: "none", background: "#17a2b8", color: "#fff", cursor: "pointer", fontWeight: "bold" }}
            >
              Purchase
            </button>
          </div>
        ))}

        {paymentMessage && (
          <div style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#28a745",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            <span>{paymentMessage}</span>
            <button onClick={() => setPaymentMessage("")} style={{ background: "transparent", border: "none", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>X</button>
          </div>
        )}
      </div>
    </div>
  );
}
