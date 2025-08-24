import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'Ksenia Rapcunová - Yoga & Meditation Teacher';
  mobileMenuOpen = false;
  navbarScrolled = false;
  showLoader = true;

  scrollDownOneScreen() {
    const startPosition = window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const targetPosition = startPosition + viewportHeight;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const finalPosition = Math.min(targetPosition, maxScroll);
    const distance = finalPosition - startPosition;
    const duration = 2000; // 2 seconds
    let startTime: number | null = null;

    // Smooth easing function
    const easeInOutQuart = (t: number): number => {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const ease = easeInOutQuart(progress);
      const currentPosition = startPosition + distance * ease;
      
      window.scrollTo(0, currentPosition);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }

  ngOnInit() {
    // Hide loader after 3 seconds with smooth transition
    setTimeout(() => {
      this.showLoader = false;
    }, 3000);
    
    // Initialize counter animations when component loads
    this.initCounterAnimations();
    
    // Initialize navbar scroll listener
    this.initNavbarScroll();
  }

  private initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    const animatedCounters = new Set<Element>();

    const animateCounter = (counter: Element) => {
      if (animatedCounters.has(counter)) return;
      animatedCounters.add(counter);

      const target = parseInt((counter as HTMLElement).dataset['target'] || '0');
      const isPercentage = counter.textContent?.includes('%');
      const hasPlus = counter.textContent?.includes('+');
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        
        const suffix = isPercentage ? '%' : (hasPlus ? '+' : '');
        counter.textContent = Math.floor(current) + suffix;
      }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  private initNavbarScroll() {
    const updateNavbar = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.pageYOffset;
      
      // Update navbar state based on scroll position
      this.navbarScrolled = scrollY >= heroHeight - 100;
    };

    // Initial check
    updateNavbar();
    
    // Listen to scroll events
    window.addEventListener('scroll', updateNavbar);
  }
}
