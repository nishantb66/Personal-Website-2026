# Domain: Animation & Interaction - Data Flow

1. Client component mounts in browser.
2. Framer Motion hooks subscribe to scroll and viewport state.
3. Motion values drive style transforms (`scaleX` for top progress bar).
4. Enter/in-view transitions run based on component visibility.
5. Local UI state (`menuOpen`) toggles mobile navigation panel.
