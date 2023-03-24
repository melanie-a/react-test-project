import cy from 'cypress';

describe('Test de déconnexion', () => {
  it('Déconnecte l’utilisateur', () => {
    // Se rendre sur la page de login
    cy.visit('/login')

    // Entrer le login, le mot de passe et valider le formulaire
    cy.get('input[name="username"]').type('username')
    cy.get('input[name="password"]').type('password')
    cy.get('button[type="submit"]').click()

    // On doit être redirigé sur la page d’accueil
    cy.url().should('include', '/')

    // Cliquer sur le bouton Déconnexion
    cy.get('button[data-testid="logout-button"]').click()

    // Le bouton Déconnexion n’est plus présent
    cy.contains('Bienvenue').should('not.exist')
  })
})
