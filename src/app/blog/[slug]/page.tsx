import { notFound } from "next/navigation";
import { BlogPostClient } from "@/components/blog-post-client";

// Sample blog post data - in a real app, this would come from a CMS or markdown files
const blogPosts = {
  "building-better-ux": {
    title: "Building Better User Experiences",
    description: "Thoughts on designing interfaces that truly serve users. Exploring the principles of user-centered design and how to apply them in modern web development.",
    date: "2024-01-15",
    readTime: "5 min read",
    tags: ["UX", "Design", "Frontend"],
    content: `
# Building Better User Experiences

User experience design is more than just making things look pretty. It's about creating interfaces that truly serve users and help them accomplish their goals efficiently and enjoyably.

## The Foundation of Good UX

Great user experience starts with understanding your users. This means:

- **Research first**: Before you design anything, understand who your users are, what they need, and what problems they're trying to solve.
- **Empathy over assumptions**: Don't assume you know what users want. Talk to them, observe them, and test your assumptions.
- **Context matters**: The same user might have different needs in different contexts.

## Key Principles

### 1. Simplicity
Remove unnecessary complexity. Every element on your interface should serve a purpose.

\`\`\`jsx
// Bad: Too many options overwhelm users
function ComplexButton() {
  return (
    <button className="btn btn-primary btn-large btn-rounded btn-animated btn-shadow">
      Click me!
    </button>
  );
}

// Good: Simple and focused
function SimpleButton() {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Click me!
    </button>
  );
}
\`\`\`

### 2. Consistency
Maintain consistent patterns throughout your interface. Users should be able to predict how things work.

### 3. Feedback
Always provide clear feedback for user actions. Loading states, success messages, and error handling are crucial.

## The Process

1. **Research and Discovery**: Understand the problem space
2. **Define and Ideate**: Create user personas and user journeys
3. **Design and Prototype**: Create wireframes and prototypes
4. **Test and Iterate**: Get feedback and refine your designs
5. **Measure and Optimize**: Use analytics to understand how users interact with your design

## Tools and Techniques

Some of my favorite tools for UX design:

- **Figma**: For design and prototyping
- **Hotjar**: For user behavior analysis
- **UserTesting**: For getting user feedback
- **Analytics**: For measuring success

## Conclusion

Building better user experiences is an ongoing process. It requires empathy, research, and a willingness to iterate based on feedback. Remember, the best interface is often the one that gets out of the user's way and lets them accomplish their goals.

The key is to always put users first and design with intention. Every decision should be made with the user's needs in mind.
    `
  },
  "minimal-design": {
    title: "The Art of Minimal Design",
    description: "Why less is often more in digital design. A deep dive into minimalism and how it can improve user experience and performance.",
    date: "2024-01-10",
    readTime: "7 min read",
    tags: ["Design", "Minimalism", "UI"],
    content: `
# The Art of Minimal Design

Minimalism in design isn't about removing everything—it's about removing the unnecessary to highlight what matters most.

## What is Minimal Design?

Minimal design is characterized by:
- Clean, uncluttered interfaces
- Purposeful use of whitespace
- Limited color palettes
- Simple typography
- Focus on essential elements

## Benefits of Minimal Design

### Performance
Less elements mean faster load times and better performance.

### Clarity
Users can focus on what's important without distractions.

### Timeless Appeal
Minimal designs tend to age better than trend-heavy designs.

## How to Achieve Minimal Design

1. **Start with purpose**: Every element should have a clear reason for existing
2. **Use whitespace effectively**: Don't be afraid of empty space
3. **Choose typography carefully**: Stick to 1-2 fonts maximum
4. **Limit your color palette**: 2-3 colors can be more effective than 10
5. **Prioritize content**: Make sure the most important information stands out

Remember: Minimal doesn't mean boring. It means intentional.
    `
  }
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = blogPosts[resolvedParams.slug as keyof typeof blogPosts];
  
  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
} 