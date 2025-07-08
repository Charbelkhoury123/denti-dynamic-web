'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FacebookIcon, FrameIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from 'lucide-react';
import { Link, useParams } from "react-router-dom";
import { ThemeToggle } from '@/components/ThemeToggle';
import { useDentistData } from '@/hooks/useDentistData';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

export function Footer() {
	const { slug } = useParams();
	const { dentist } = useDentistData(slug);
	const currentYear = new Date().getFullYear();
	const businessName = dentist?.business_name || 'Dental Practice';

	// Helper function to build URLs with slug preservation
	const buildUrl = (path: string) => {
		if (!slug) {
			return path;
		}
		// For paths that start with /, preserve them as global routes
		if (path.startsWith('/') && !path.startsWith(`/${slug}`)) {
			return path;
		}
		// For relative paths, add the slug
		return `/${slug}/${path}`;
	};

	const footerLinks: FooterSection[] = [
		{
			label: 'Services',
			links: [
				{ title: 'About', href: buildUrl('about') },
				{ title: 'Services', href: buildUrl('') }, // Will show services on main page
				{ title: 'Contact', href: buildUrl('contact') },
			],
		},
		{
			label: 'Information',
			links: [
				{ title: 'FAQs', href: buildUrl('faqs') },
				{ title: 'Pricing', href: buildUrl('pricing') },
				{ title: 'Testimonials', href: buildUrl('testimonials') },
				{ title: 'Blog', href: buildUrl('blog') },
			],
		},
		{
			label: 'Legal',
			links: [
				{ title: 'Privacy Policy', href: '/privacy' },
				{ title: 'Terms of Service', href: '/terms' },
			],
		},
		{
			label: 'Social Links',
			links: [
				{ title: 'Facebook', href: '#', icon: FacebookIcon },
				{ title: 'Instagram', href: '#', icon: InstagramIcon },
				{ title: 'Youtube', href: '#', icon: YoutubeIcon },
				{ title: 'LinkedIn', href: '#', icon: LinkedinIcon },
			],
		},
	];

	return (
		<footer className="relative w-full mx-auto flex flex-col items-center justify-center rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl border-t border-border bg-card px-4 sm:px-6 py-6 sm:py-8 md:py-12 lg:py-16 font-sans">
			<div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="grid w-full max-w-6xl gap-6 sm:gap-8 xl:grid-cols-3 xl:gap-8">
				<AnimatedContainer className="space-y-4">
					<Link to={slug ? `/${slug}` : '/'} className="inline-block">
						<FrameIcon className="w-8 h-8 text-primary" />
					</Link>
					<p className="text-muted-foreground mt-4 sm:mt-8 text-sm md:mt-0 mb-4">
						© {new Date().getFullYear()} Dental Practice. All rights reserved.
					</p>
					<div className="flex items-center gap-3">
						<span className="text-sm text-muted-foreground">Theme:</span>
						<ThemeToggle />
					</div>
				</AnimatedContainer>

				<div className="mt-4 sm:mt-6 md:mt-10 grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-0">
								<h3 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider mb-2 sm:mb-3">{section.label}</h3>
								<ul className="space-y-2">
									{section.links.map((link) => (
										<li key={link.title}>
											{(section.label === 'Social Links') ? (
												<a
													href={link.href}
													className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm transition-colors duration-200 hover:underline"
													target="_blank"
													rel="noopener noreferrer"
												>
													{link.icon && <link.icon className="mr-2 w-4 h-4" />}
													{link.title}
												</a>
											) : (
												<Link
													to={link.href}
													className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm transition-colors duration-200 hover:underline"
												>
													{link.icon && <link.icon className="mr-2 w-4 h-4" />}
													{link.title}
												</Link>
											)}
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}