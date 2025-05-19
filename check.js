<script>
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".profile-image img");

  images.forEach(img => {
    img.onerror = () => {
      console.warn(`❌ Image not found: ${img.src}`);
      // Optionally, display fallback or highlight broken cards
      img.style.border = "2px solid red";
      img.alt = "Missing image";

      // Optional: highlight parent card
      const card = img.closest(".profile-card");
      if (card) {
        card.style.backgroundColor = "#ffeeee";
      }
    };

    // Optional: warn if alt is empty
    if (!img.alt || img.alt.trim() === "") {
      console.warn(`⚠️ Missing alt text for image: ${img.src}`);
    }
  });
});
</script>
